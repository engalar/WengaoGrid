import { useEffect, useCallback, ReactElement, useMemo, createElement, useState } from "react";
import { ValueStatus } from "mendix";
import { Button, message, Upload, UploadFile } from "antd";
import { WengaoFileUploadContainerProps } from "../typings/WengaoFileUploadProps";

import "./ui/WengaoFileUpload.css";
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

export function WengaoFileUpload(props: WengaoFileUploadContainerProps): ReactElement {
    const datasourceFileList = useMemo<UploadFile[]>(() => {
        if (
            props.isMultiple &&
            props.datasource &&
            props.datasource.status === ValueStatus.Available &&
            props.datasource.items
        ) {
            return props.datasource.items.map(item => {
                // file?guid=1234567890
                const url = props.uploadUrlDatasource!.get(item).value!;
                const uid = url.split("?")[1].split("=")[1];
                return { url, uid, name: props.fileNameDatasource!.get(item).value! };
            });
        } else {
            return [];
        }
    }, [props.datasource]);
    const [fileList, setFileList] = useState<UploadFile[]>(datasourceFileList);
    const [uploading, setUploading] = useState(false);

    const handleUpload = useCallback(async () => {
        setUploading(true);
        // save documents one by one, asynchronously promise.all
        fileList.reduce(async (prevPromise, file) => {
            await prevPromise;
            // @ts-ignore
            await saveDocument(file, file.uid, file.name || file.fileName);
        }, Promise.resolve());
        setUploading(false);
    }, [fileList]);

    useEffect(() => {
        const needNew = fileList.some(file => !file.uid);
        if (needNew && props.onNewFile && props.onNewFile.canExecute) {
            props.onNewFile.execute();
        }
        console.log(fileList, datasourceFileList);

        // file.url is the unique identifier of the file, if not exist, need upload
    }, [fileList, datasourceFileList]);

    return (
        <div className={props.class}>
            <Dragger
                multiple
                fileList={[...datasourceFileList, ...fileList]}
                previewFile={file => {
                    return Promise.resolve(file.type);
                }}
                beforeUpload={file => {
                    const isPNG = file.type === "image/png";
                    if (!isPNG) {
                        message.error(`${file.name} is not a png file`);
                    } else {
                        setFileList([...fileList, file]);
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
                onRemove={file => {
                    setFileList(fileList.filter(item => item.uid !== file.uid));
                }}
                onDrop={e => {
                    console.log("Dropped files", e.dataTransfer.files);
                }}
            >
                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                    files.
                </p>
            </Dragger>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? "Uploading" : "Start Upload"}
            </Button>
        </div>
    );
}
