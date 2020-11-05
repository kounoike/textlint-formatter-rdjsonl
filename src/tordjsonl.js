"use strict";
import * as fs from "fs";
import * as path from "path";
import groupBy from "lodash.groupby";

const severities = ["INFO", "WARNING", "ERROR"];

function toReviewDogDiagnostic(results) {
    const outputResult = [];
    results.forEach((r) => {
        const filePath = r.filePath;
        r.messages.forEach((m) => {
            const severity = severities[m.severity];
            let result = {
                message: m.message,
                severity: severity,
                location: {
                    path: filePath,
                    range: {
                        start: {line: m.line, column:m.column}
                    }
                }
            };
            if (m.fix && m.fix.text.indexOf("\n") === -1) {
                result.suggestions = [
                    {
                        range: {
                            start: {line: m.line, column: m.column},
                            end: {line: m.line, column: m.column + (m.fix.range[1] - m.fix.range[0])},
                            text: m.fix.text
                        }
                    }
                ]
            }
            outputResult.push(result);
        });
    });
    const allResultsByFilePath = groupBy(results, result => {
        return result.filePath;
    });
    return outputResult;
}

export default toReviewDogDiagnostic;