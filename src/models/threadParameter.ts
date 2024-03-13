import { Parameter } from "@prisma/client";

export interface ThreadParameter {
    parameter: Parameter,
    value: string
}