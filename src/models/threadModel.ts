import { Modifier, PrismaClient, Template } from "@prisma/client";
import { ThreadChatMessage } from "./threadChatMessageModel";
import { ThreadParameter } from "./threadParameter";

const prisma = new PrismaClient();

const PUBLIC_FIELDS = {
    uuid: true,
    key: true,
    title: true,
    slug: true,
    response: true,
    created_at: true,
}

const getOneByUUID = async (uuid: string) => {
    return await prisma.thread.findUnique({ 
        where: { 
            uuid 
        },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: true,
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const getOneById = async (id: number) => {
    return await prisma.thread.findUnique({
        where: { id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: true,
            threads_chat_messages: {
                include: {
                    threads_chat_messages_modifiers: {
                        select: {
                            modifier: {
                                select: {
                                    uuid: true,
                                    title: true
                                }
                            }
                        }
                    }
                }
            },
            threads_templates: true,
            threads_modifiers: true,
            threads_parameters: true
        }
    });
}

const getAllByWorkspace = async (workspace_id: number) => {
    return await prisma.thread.findMany({
        where: { workspace_id },
        include: {
            user: true,
            workspace: true,
            technology: true,
            provider: {
                include: {
                    technology: true,
                    parameters: true
                }
            },
            threads_chat_messages: {
                include: {
                    threads_chat_messages_modifiers: {
                        select: {
                            modifier: {
                                select: {
                                    uuid: true,
                                    title: true
                                }
                            }
                        }
                    },
                    threads_chat_messages_templates: {
                        select: {
                            template: {
                                select: {
                                    uuid: true,
                                    title: true
                                }
                            }
                        }
                    },
                }
            },
            threads_templates: {
                include: {
                    template: true
                }
            },
            threads_modifiers: {
                include: {
                    modifier: true
                }
            },
            threads_parameters: {
                include: {
                    parameter: true
                }
            }
        },
        orderBy: {
            key: "asc"
        }
    });
}

const createOne = async (
    title: string,
    slug: string,
    key: string,
    content: string,
    response: string,
    user_id: number,
    workspace_id: number,
    technology_id: number,
    provider_id: number,
    templates: Template[],
    modifiers: Modifier[],
    threadParameters: ThreadParameter[]
) => {
    const templates_ids = templates.map(t => {
        return { template_id: t.id };
    });

    const modifiers_ids = modifiers.map(m => {
        return { modifier_id: m.id };
    });

    const parameters_ids = threadParameters.map(p => ({
        parameter_id: p.parameter.id,
        value: p.value
    }));

    return await prisma.thread.create({
        include: {
            threads_chat_messages: true
        },
        data: {
            title,
            slug,
            key,
            content,
            response,
            user_id,
            workspace_id,
            technology_id,
            provider_id,
            templates,
            modifiers,
            threads_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            threads_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            },
            threads_parameters: {
                createMany: {
                    data: parameters_ids
                }
            },
        }
    });
}

const updateOne = async (
    id: number,
    title: string,
    slug: string,
    key: string,
    content: string,
    response: string,
    collapsed: boolean,
    user_id: number,
    workspace_id: number,
    technology_id: number,
    provider_id: number,
    templates: Template[],
    modifiers: Modifier[],
    chatMessages: ThreadChatMessage[]
) => {
    const templates_ids = templates.map(t => {
        return { template_id: t.id };
    });

    const modifiers_ids = modifiers.map(m => {
        return { modifier_id: m.id };
    });

    await prisma.threadTemplate.deleteMany({
        where: {
            thread_id: id
        }
    });

    await prisma.threadModifier.deleteMany({
        where: {
            thread_id: id
        }
    });

    return await prisma.thread.update({
        include: {
            threads_chat_messages: true
        },
        where: { id },
        data: {
            title,
            slug,
            key,
            content,
            response,
            collapsed,
            templates,
            modifiers,  
            user_id,
            workspace_id,
            technology_id,
            provider_id,
            threads_templates: {
                createMany: {
                    data: templates_ids
                }
            },
            threads_modifiers: {
                createMany: {
                    data: modifiers_ids
                }
            }
        }
    });
}


const deleteOne = async (id: number) => {
    return await prisma.thread.delete({
        where: { id }
    })
}

const deleteAllByWorkspaceId = async (workspace_id: number) => {
    return await prisma.thread.deleteMany({
        where: {
            workspace_id
        }
    })
}


export default {
    PUBLIC_FIELDS,
    getOneByUUID,
    getOneById,
    getAllByWorkspace,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByWorkspaceId
}