import generate from "@babel/generator";
import { File } from "@babel/types";

export const GenerateCodeFromAst = (ast : File): string => {
    try{
        return generate(ast).code?.replaceAll("function (","function(");
    } catch(error) {
        return "";
    }
};
