export interface TableData {
    [key: string]: string | number | boolean | undefined;
    NftId?: string;
    Symbol?: string;
    ApprovedPrice?: string;
    Action?: string;
    ValidatorsCount?: number;
    TokenAddress?: string;
    TokenUri?: string;
    Valuating?: boolean;
    Validator?: string;
    ValidatorRank?: number;
}