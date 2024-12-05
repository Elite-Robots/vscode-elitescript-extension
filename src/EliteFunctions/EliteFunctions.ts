import * as vscode from 'vscode';

/**
 * The function parameter infomation, include name, description...
 */
export class FunctionParameter{
    // The parameter's name
    name: string;
    // The description of parameter
    description: string;
    // The type of parameter
    type : string;
    // The default value of parameter
    default: string;

    /**
     * Constructor function
     * @param param The infomation of parameter
     */
    constructor(param: {
        "name": string,
        "description": string,
        "type": string,
        "default":string
    }) {
        this.name = param.name;
        this.description = param.description;
        this.type = param.type;
        this.default = param.default;
    }

    /**
     * Generate param string in func, like:
     *  param:string = "123"
     * @returns 
     */
    public generateParam() :string {
        if(this.default.length > 0) {
            return `${this.name}: ${this.type} = ${this.default}`;
        } else {
            return `${this.name}: ${this.type}`;
        }
        
    }

    /**
     * Generate parameter's description, like:
     *  slave: the modbus slave id
     * @returns Parameter's description
     */
    public generateDescriptionParam() :string {
        return `${this.name}: ${this.description}`;
    }
};

/**
 * The function infomation, include name, description ...
 */
export class Function {
    // The function name
    name: string;
    // Description of function
    description: string;
    // The parameter's infomation array
    parameters: FunctionParameter[];
    // Note when using the function
    note: string;
    // The type of the function's return value
    return_type: string;
    // The description of return value
    return_description: string;
    // Using tips
    tips: string;
    // The function's doc. Generate when constructor
    doc: vscode.MarkdownString;

    /**
     * Constructor function
     * @param func The function's infomation
     */
    constructor(func: {
        "name": string,
        "description": string;
        "parameters": {
            "name": string,
            "description": string,
            "type": string,
            "default":string
        }[];
        "note": string;
        "return_type": string;
        "return_description": string;
        "tips": string;
    }) {
        this.name = func.name;
        this.description = func.description;
        this.parameters = func.parameters.map(para => new FunctionParameter(para));
        this.note = func.note;
        this.return_type = func.return_type;
        this.return_description = func.return_description;
        this.tips = func.tips;

        // Generate the function's doc
        let doc_str: string = "";
        doc_str += this.generateDefinitionDoc();
        doc_str += "#### Description\n";
        doc_str += this.description + "\n";
        if(this.parameters.length > 0) {
            doc_str += "#### Parametersn\n";
            doc_str += "\n- ";
            doc_str += this.parameters.map(para => para.generateDescriptionParam()).join("\n- ");
            doc_str += "\n";
        }
        if(this.return_description.length) {
            doc_str += "#### Return\n";
            doc_str += `\n${this.return_description}\n`;
        }
        if(this.note.length) {
            doc_str += "#### Note\n";
            doc_str += `${this.note}`;
        }
        if(this.tips.length) {
            doc_str += "#### Tips\n";
            doc_str += `${this.tips}`;
        }
        this.doc = new vscode.MarkdownString(doc_str);

    }

    /**
     * Generates the definition string of the function, like:
     *  def to_num(param:string) -> list
     * @returns Function definition
     */
    private generateDefinitionDoc(): string {
        let param_str : string = "";
        if(this.parameters.length > 0) {
            param_str = this.parameters.map(para => para.generateParam()).join(", ");
        }
        const func_lable = `def ${this.name}(${param_str}) -> ${this.return_type}`;
        const doc_str = `\`\`\`python\n${func_lable}\n\`\`\`\n`
        return doc_str;
    }

};
