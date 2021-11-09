export default function SuperOfficeProvider(options) {
    return {
      id: "superoffice",
      name: "SuperOffice",
      type: "oauth",
      version: "2.0",
      wellKnown: `https://${options.environment}.superoffice.com/login/.well-known/openid-configuration`,
      authorization: { 
        params: 
        { 
          scope: "openid",
          grant_type: "authorization_code"
        } 
      },
      idToken: true, // true means do not call user_info_endpoint (handle in profile callback below)
      async profile(profile, tokens) {

        // with idToken set to true, the profile contains id_token claims.
        // https://github.com/nextauthjs/next-auth/blob/main/src/server/lib/oauth/callback.js

        const props = superOfficeSettings();
        const { 
          [props.claims.restUrl]: restUrl,
          [props.claims.primaryEmail]: email,
          [props.claims.email]: userEmail,
          [props.claims.tenantId]: ctx,
          [props.claims.associate]: userId,
          [props.claims.isAdmin]: isAdmin,
          [props.claims.initials]: initials
        } = profile;

        const { access_token } = tokens;
        const profileUrl = `${restUrl}v1/User/currentPrincipal`;

        const principal = await fetchPrincipal(profileUrl, access_token)
       
        const { 
          [props.principal.ContactId]: contactId,
          [props.principal.PersonId]: personId,
          [props.principal.GroupId]: groupId,
          [props.principal.SecondaryGroups]: secondaryGroupIds,
          [props.principal.RoleId]: roleId,
          [props.principal.FullName]: userName,
        } = principal;
        
        profile.restUrl         = restUrl;
        profile.customerId      = ctx;
        profile.isAdmin         = isAdmin;
        profile.contactId       = contactId;
        profile.personId        = personId;
        profile.groupId         = groupId;
        profile.roleId          = roleId;
        profile.initials        = initials;
        profile.env             = process.env.SUPEROFFICE_ENV;
        profile.secondaryGroups = secondaryGroupIds;

        return { 
          ...profile, 
          //id: `${ctx}:${userId}`,
          id: profile.sub,
          name: userName,
          email: email,
          image: `${restUrl}v1/Person/${personId}/Image?type=PNG&ifBlank=ClearPixel`,
        }
      },
      ...options,
    }
  }

  async function fetchPrincipal(url, accessToken) {
    console.log("Start fetch");
    const fetched = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return await fetched.json();
  }

  function superOfficeSettings() {
    return {
        claims: {
            "sub":              "sub",
            "associate":        "http://schemes.superoffice.net/identity/associateid",
            "identityprovider": "http://schemes.superoffice.net/identity/identityprovider",
            "email":            "http://schemes.superoffice.net/identity/email",
            "userEmail":        "http://schemes.superoffice.net/identity/upn",
            "isAdmin":          "http://schemes.superoffice.net/identity/is_administrator",
            "tenantId":         "http://schemes.superoffice.net/identity/ctx",
            "companyName":      "http://schemes.superoffice.net/identity/company_name",
            "serialNumber":     "http://schemes.superoffice.net/identity/serial",
            "soapUrl":          "http://schemes.superoffice.net/identity/netserver_url",
            "restUrl":          "http://schemes.superoffice.net/identity/webapi_url",
            "systemUserToken":  "http://schemes.superoffice.net/identity/system_token",
            "initials":         "http://schemes.superoffice.net/identity/initials",
            "primaryEmail":     "http://schemes.superoffice.net/identity/so_primary_email_address",
            "issuer":           "is",
            "audience":         "aud"
        },
        principal: {
          "UserType"                 : "UserType",                   //string	
          "Associate"                : "Associate",                  //string	
          "AssociateId"              : "AssociateId",                //int32	
          "IsPerson"                 : "IsPerson",                   //bool	
          "PersonId"                 : "PersonId",                   //int32	
          "CountryId"                : "CountryId",                  //int32	
          "HomeCountryId"            : "HomeCountryId",              //int32	
          "ContactId"                : "ContactId",                  //int32	
          "GroupId"                  : "GroupId",                    //int32	
          "BusinessId"               : "BusinessId",                 //int32	
          "CategoryId"               : "CategoryId",                 //int32	
          "ContactOwner"             : "ContactOwner",               //int32	
          "RoleId"                   : "RoleId",                     //int32	
          "RoleName"                 : "RoleName",                   //string	
          "RoleDescription"          : "RoleDescription",            //string	
          "RoleType"                 : "RoleType",                   //string	
          "Licenses"                 : "Licenses",                   //array	
          "FullName"                 : "FullName",                   //string	
          "EMailAddress"             : "EMailAddress",               //string	
          "FunctionRights"           : "FunctionRights",             //array	
          "EjUserId"                 : "EjUserId",                   //int32	
          "EjAccessLevel"            : "EjAccessLevel",              //int32	
          "EjUserStatus	"            : "EjUserStatus	",             //string	
          "ProvidedCredentials"	     : "ProvidedCredentials",	       //array	
          "SecondaryGroups"	         : "SecondaryGroups",	           //array	
          "DatabaseContextIdentifier": "DatabaseContextIdentifier",	 //string	
          "UserName"	               : "UserName"	                   //string
        }
    }
}