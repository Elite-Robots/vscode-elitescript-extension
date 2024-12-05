import * as eliteFunctions from './EliteFunctions';
import { CountryLanguage } from '../Configure/config';

import robotBusEn from './en/busFunctions.json';
import robotBusCn from './cn/busFunctions.json';
import robotCommEn from './en/communicationFunctions.json';
import robotCommCn from './cn/communicationFunctions.json';
import robotForceControlEn from './en/force_controlFunctions.json';
import robotForceControlCn from './cn/force_controlFunctions.json';
import robotIoEn from './en/ioFunctions.json';
import robotIoCn from './cn/ioFunctions.json';
import robotMathEn from './en/mathFunctions.json';
import robotMathCn from './cn/mathFunctions.json';
import robotMotionEn from './en/motionFunctions.json';
import robotMotionCn from './cn/motionFunctions.json';
import robotSysEn from './en/SysFunctions.json';
import robotSysCn from './cn/SysFunctions.json';


/**
 * Load different json files depending on the language
 * @param language 
 * @param jsonFile 
 * @returns json file
 */
async function loadJson(language : CountryLanguage, jsonFile : string) {
    switch (language) {
        case CountryLanguage.CHINESE:
            return await import(`./cn/${jsonFile}`);
        case CountryLanguage.ENGLISH:
            return await import(`./en/${jsonFile}`);
        default:
            return await import(`./en/${jsonFile}`);
    }
}

/**
 * Map json file to function array
 * @param language 
 * @param jsonFile 
 * @returns functions array
 */
async function mapJson2FunctionArray(language : CountryLanguage, jsonFile : string): Promise<eliteFunctions.Function[] | undefined> {
    let motionFunctions = await loadJson(language, jsonFile);
    let jsonData = motionFunctions.default;
    if(Array.isArray(jsonData)) {
        return await jsonData.map(jsMthd => new eliteFunctions.Function(jsMthd));
    } else {
        return undefined;
    }
}

/**
 * Must referenc json file
 */
function referenceEliteFunctionJson() {
    robotMotionEn;
    robotMotionCn;
    robotBusEn;
    robotBusCn;
    robotCommEn;
    robotCommCn;
    robotForceControlEn;
    robotForceControlCn;
    robotIoEn;
    robotIoCn;
    robotMathEn;
    robotMathCn;
    robotSysEn;
    robotSysCn;
}

/**
 * Combines two function array
 */
function concatFunctionsArray(origin : eliteFunctions.Function[], 
                              other: eliteFunctions.Function[] | undefined) {
    if(other == undefined) {
        return origin;
    }
    return origin.concat(other);
}

/**
 * Load elite robot functions 
 * @param language english, chinese or other language
 * @returns Elite robot function array
 */
export async function loadEliteFunctions(language : CountryLanguage): Promise<eliteFunctions.Function[] | undefined>  {
    // Must reference json, otherwise will not copy json file to output
    referenceEliteFunctionJson();
    // Create the origin array.
    let functionList = await mapJson2FunctionArray(language, "motionFunctions.json");
    if(functionList == undefined) {
        return undefined
    }
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "busFunctions.json"));
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "communicationFunctions.json"));
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "force_controlFunctions.json"));
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "ioFunctions.json"));
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "mathFunctions.json"));
    functionList = concatFunctionsArray(functionList, await mapJson2FunctionArray(language, "sysFunctions.json"));
    return functionList;

}
