import { useRef, useEffect, useCallback, ReactElement, createElement, useState } from "react";
import { ValueStatus } from "mendix";
import { Button, ConfigProvider, message, Upload, UploadFile } from "antd";
import { useUpdate } from "ahooks";
import localeCN from "antd/locale/zh_CN";
import localeEN from "antd/locale/en_US";

import { WengaoFileUploadContainerProps } from "../typings/WengaoFileUploadProps";

import "./ui/WengaoFileUpload.css";
import type { Locale } from "antd/es/locale";
const { Dragger } = Upload;

// https://apidocs.rnd.mendix.com/9/client/mx.data.html#.saveDocument

async function saveDocument(fileBlob: File, guid: string, fileName: string) {
    await new Promise((resolve, reject) => {
        // @ts-ignore
        mx.data.saveDocument(
            guid,
            fileName,
            {
                /* width: 180, height: 180 */
            },
            fileBlob,
            resolve,
            reject
        );
    });
}
function useBatchProcessor(batchInterval: number, processBatch: (batch: UploadFile[]) => void) {
    const [batch, setBatch] = useState<UploadFile[]>([]);
    const batchRef = useRef<UploadFile[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (batchRef.current.length > 0) {
                processBatch(batchRef.current);
                batchRef.current = [];
                setBatch([]);
            }
        }, batchInterval);

        return () => clearInterval(interval);
    }, [batch]);

    const addToBatch = (item: UploadFile) => {
        batchRef.current = [...batchRef.current, item];
        setBatch(batchRef.current);
    };

    return addToBatch;
}
export function WengaoFileUpload(props: WengaoFileUploadContainerProps): ReactElement {
    const [syncList, setSyncList] = useState<UploadFile[]>([]);
    /**
     * file upload state, including uploaded files and upload placeholder
     */
    useEffect(() => {
        if (
            props.isMultiple &&
            props.datasource &&
            props.datasource.status === ValueStatus.Available &&
            props.datasource.items
        ) {
            const result: UploadFile[] = props.datasource.items.map(item => {
                // file?guid=1234567890
                const url = props.uploadUrlDatasource!.get(item).value!;
                const uid = url.split("?")[1].split("=")[1];
                const file: UploadFile = { url, uid, name: props.fileNameDatasource!.get(item).value! };
                return file;
            });
            setSyncList(result);
        }
    }, [props.datasource]);
    /**
     * file upload source, including uploaded files and to upload files
     */
    const [pendingList, setPendingList] = useState<UploadFile[]>([]);
    const [readyTaskFileList, setReadyTaskFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const addToBatch = useBatchProcessor(1000, (batch: UploadFile[]) => {
        setPendingList([...pendingList, ...batch]);
    });
    const update = useUpdate();
    const handleUpload = useCallback(async () => {
        setUploading(true);
        // save documents one by one, asynchronously promise.all
        await readyTaskFileList.reduce(async (prevPromise, file) => {
            await prevPromise;
            file.status = "uploading";
            update();
            // @ts-ignore
            await saveDocument(file, file.uid, file.name || file.fileName);
            file.status = "done";
            update();
        }, Promise.resolve());
        setUploading(false);
        setReadyTaskFileList([]);
        props.datasource?.reload();
    }, [readyTaskFileList]);

    // pending task request count
    const [reqCount, setReqCount] = useState(0);

    useEffect(() => {
        const uploadedFileList = syncList.filter(file => file.name);
        const placeholderFileList = syncList.filter(file => !file.name);
        console.log("fileupload[sync][raw, uploaded, placeholder]", syncList, uploadedFileList, placeholderFileList);

        if (placeholderFileList.length === pendingList.length && pendingList.length > 0) {
            // 03 all pending task ready(get same count placeholder)
            // iterator over pendingCount
            for (let i = 0; i < pendingList.length; i++) {
                const placeHolder = placeholderFileList[i];
                pendingList[i].url = placeHolder.url;
                // assert placeHolder.url is not undefined
                if (!placeHolder.url) {
                    throw new Error("placeHolder.url is undefined");
                }
                const uid = placeHolder.url.split("?")[1].split("=")[1];
                pendingList[i].uid = uid;
            }
            setReqCount(0);
            setReadyTaskFileList(pendingList);
            setPendingList([]);
            console.log("fileupload[task ready][taskFileList]", pendingList);
        }
        // file.url is the unique identifier of the file, if not exist, need upload
    }, [pendingList, syncList]);

    useEffect(() => {
        // 01 task pending
        if (pendingList.length > reqCount && props.onNewFile && props.onNewFile.canExecute) {
            // 02 req placeHolder
            props.onNewFile.execute();
            setReqCount(reqCount + 1);
            console.log("fileupload[new task req][pendingCount]", reqCount + 1);
        }
    }, [pendingList, reqCount, props.onNewFile]);

    const handleRemove = useCallback(
        (file: UploadFile) => {
            const index = syncList.findIndex(item => item.uid === file.uid);
            if (index !== -1) {
                const obj = props.datasource?.items?.[index];
                if (obj && props.onRemoveFile) {
                    props.onRemoveFile?.get(obj).execute();
                }
            }
        },
        [syncList, props.datasource]
    );

    // combine two type
    let locale: Locale & { _?: any };
    // @ts-ignore
    switch (mx.session.getConfig("locale.code")) {
        case "zh_CN":
            locale = localeCN;
            locale._ = {
                a: "点击或拖动文件到此区域以上传",
                b: `支持单个或批量上传。严禁上传公司数据或其他禁止的文件。`
            };
            break;
        case "en_US":
        default:
            locale = localeEN;
            locale._ = {
                a: "Click or drag file to this area to upload",
                b: `Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                        files.`
            };
    }
    // https://ant-design.antgroup.com/components/upload-cn#api
    return (
        <div className={props.class}>
            <ConfigProvider locale={locale}>
                <Dragger
                    multiple
                    listType="picture-card"
                    fileList={[...syncList.filter(file => file.name), ...readyTaskFileList]}
                    previewFile={file => {
                        return Promise.resolve(file.type);
                    }}
                    beforeUpload={file => {
                        const isPNG = file.type === "image/png";
                        if (!isPNG) {
                            message.error(`${file.name} is not a png file`);
                        } else {
                            console.log("fileupload[new task]", pendingList, file);
                            // need delay 500ms to collect file into pendingList
                            addToBatch(file);
                        }
                        // return isPNG || Upload.LIST_IGNORE;
                        return Promise.resolve(false);
                    }}
                    onChange={info => {
                        const { status } = info.file;
                        if (status !== "uploading") {
                            console.log(info.file, info.fileList);
                        }
                        if (status === "done") {
                            message.success(`${info.file.name} file uploaded successfully.`);
                        } else if (status === "error") {
                            message.error(`${info.file.name} file upload failed.`);
                        }
                    }}
                    onRemove={handleRemove}
                    onDrop={e => {
                        console.log("Dropped files", e.dataTransfer.files);
                    }}
                >
                    <p className="ant-upload-drag-icon"></p>
                    <p className="ant-upload-text">{locale._.a}</p>
                    <p className="ant-upload-hint">{locale._.b}</p>
                </Dragger>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={readyTaskFileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? "Uploading" : "Start Upload"}
                </Button>
            </ConfigProvider>
        </div>
    );
}
