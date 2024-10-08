// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package fakedata.actions;

import java.util.Random;
import com.github.javafaker.Faker;
import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;
import fakedata.proxies.Name;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class GenerateName extends CustomJavaAction<IMendixObject>
{
	public GenerateName(IContext context)
	{
		super(context);
	}

	@java.lang.Override
	public IMendixObject executeAction() throws Exception
	{
		// BEGIN USER CODE
		Random random = new Random();
		Faker faker = new Faker(random);
		com.github.javafaker.Name name = faker.name();
		
		IMendixObject object = Core.instantiate(getContext(), Name.getType());
		
		object.setValue(getContext(), Name.MemberNames.FirstName.toString(), name.firstName());
		object.setValue(getContext(), Name.MemberNames.FullName.toString(), name.fullName());
		object.setValue(getContext(), Name.MemberNames.LastName.toString(), name.lastName());
		object.setValue(getContext(), Name.MemberNames.Name.toString(), name.name());
		object.setValue(getContext(), Name.MemberNames.NameWithMiddle.toString(), name.nameWithMiddle());
		object.setValue(getContext(), Name.MemberNames.Prefix.toString(), name.prefix());
		object.setValue(getContext(), Name.MemberNames.Suffix.toString(), name.suffix());
		object.setValue(getContext(), Name.MemberNames.Title.toString(), name.title());
		object.setValue(getContext(), Name.MemberNames.UserName.toString(), name.username());
		
		return object;
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 * @return a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "GenerateName";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
