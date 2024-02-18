import { Request } from "express";

const getUserId = (req: Request): string => getString(req, 'user_id');
const getSearchTerm = (req: Request, required: boolean = false): string => getString(req, 'search_term', required);
const getTechnologiesIds = (req: Request): number[] => getIds(req, 'technologies_ids');
const getModifiersIds = (req: Request, required: boolean = false, method: string = 'get'): number[] => getIds(req, 'modifiers_ids', required, method)
const getTemplatesIds = (req: Request, required: boolean = false, method: string = 'get'): number[] => getIds(req, 'templates_ids', required, method)
const getLanguageId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'language_id', required, method)
const getRepositoryId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'repository_id', required, method)
const getTechnologyId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'technology_id', required, method)
const getProviderId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'provider_id', required, method)
const getProvidersIds = (req: Request, required: boolean = false, method: string = 'get'): number[] => getIds(req, 'providers_ids', required, method)
const getTitle = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'title', required, method)
const getDescription = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'description', required, method)
const getContent = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'content', required, method)
const getResponse = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'response', required, method)
const getPromptId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'prompt_id', required, method)
const getModifierId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'modifier_id', required, method)
const getTemplateId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'template_id', required, method)
const getWorkspaceId = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'workspace_id', required, method)
const getLimit = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'limit', required, method)
const getOffset = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'offset', required, method)
const getEmail = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'email', required, method)
const getUsername = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'username', required, method)
const getUserExternalId = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'user_external_id', required, method)
const getLanguagesIds = (req: Request, required: boolean = false, method: string = 'get'): number[] => getIds(req, 'languages_ids', required, method)
const getRepositoriesIds = (req: Request, required: boolean = false, method: string = 'get'): number[] => getIds(req, 'repositories_ids', required, method)
const getText = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'text', required, method)
const getChatHistory = (req: Request, required: boolean = false, method: string = 'get'): any[] => getArray(req, 'chat_history', required, method)
const getChatMessages = (req: Request, required: boolean = false, method: string = 'get'): any[] => getArray(req, 'chat_messages', required, method)
const getParameterNumImages = (req: Request, required: boolean = false, method: string = 'get'): number => getNumber(req, 'num_images', required, method)
const getParameterImageResolution = (req: Request, required: boolean = false, method: string = 'get'): string => getString(req, 'image_resolution', required, method)
const getPromptParameters = (req: Request, required: boolean = false, method: string = 'get'): any[] => getArray(req, 'prompt_parameters', required, method)
const getTemplateParameters = (req: Request, required: boolean = false, method: string = 'get'): any[] => getArray(req, 'template_parameters', required, method)

const missingParameterMessage = (parameter: string): string => `Missing parameter ${parameter}`;

const getParameter = (req: Request, parameter: string, method: string = 'get'): string => {
    switch (method.toLowerCase()) {
        case 'post': return req.body[parameter] as string;
        case 'url': return req.params[parameter] as string;
        default: return req.query[parameter] as string;
    }
}

const getString = (req: Request, parameter: string, required: boolean = false, method: string = 'get'): string => {
    const string = getParameter(req, parameter, method);

    if (required && string === "") throw new Error(missingParameterMessage(parameter));

    return string;
}

const getNumber = (req: Request, parameter: string, required: boolean = false, method: string = 'get'): number => {
    const number = parseInt(getParameter(req, parameter, method));

    if (required && isNaN(number)) throw new Error(missingParameterMessage(parameter));

    return number;
}

const getArray = (req: Request, parameter: string, required: boolean = false, method: string = 'get'): any[] => {
    const array = getParameter(req, parameter, method);

    // Check if exists
    if (required && (array === "" || array === undefined)) throw new Error(missingParameterMessage(parameter));

    // Check if its an array
    const json = JSON.parse(array);
    if (!Array.isArray(json)) throw new Error(`Incorrect format for parameter ${parameter}`);

    return json;
}

const getIds = (req: Request, parameter: string, required: boolean = false, method: string = 'get'): number[] => {
    const ids = getParameter(req, parameter, method);

    // Check if exists
    if (required && ids === "") throw new Error(missingParameterMessage(parameter));

    // Return empty array if not exists
    if (ids === undefined) return [];

    // Check if its an array
    const json = JSON.parse(ids);
    if (!Array.isArray(json)) throw new Error(`Incorrect format for parameter ${parameter}`);

    // Check if it contains numeric values
    const invalidIds = json.find(id => isNaN(parseInt(id)));
    if (invalidIds !== undefined) throw new Error(`All elements of parameter ${parameter} need to be numeric`);

    return json;
}

const getErrorResponse = (error: any) => {
    console.error(error);
    
    if ("response" in error && "status" in error.response && "statusText" in error.response) {
        let message = error.response.statusText;

        switch (error.response.status) {
            case 429:
                message = "Sorry, this is an experimental version and our servers are full. Please try again later";
                break;
        }

        return {
            code: 400,
            status: error.response.status,
            message
        }
    }
    
    return {
        code: 500,
        status: false,
        message: error.message
    }
}

export default {
    getUserId,
    getSearchTerm,
    getLanguagesIds,
    getRepositoriesIds,
    getTechnologiesIds,
    getModifiersIds,
    getTemplatesIds,
    getText,
    getProviderId,
    getProvidersIds,
    getPromptId,
    getModifierId,
    getWorkspaceId,
    getLanguageId,
    getRepositoryId,
    getTechnologyId,
    getTitle,
    getDescription,
    getContent,
    getResponse,
    getEmail,
    getUsername,
    getUserExternalId,
    getChatHistory,
    getTemplateId,
    getLimit,
    getOffset,
    getErrorResponse,
    getChatMessages,
    getParameterNumImages,
    getParameterImageResolution,
    getPromptParameters,
    getTemplateParameters,
}