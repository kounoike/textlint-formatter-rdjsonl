"use strict";
import toReviewdogDiagnostics from "./tordjsonl";

function reportReviewdogDiagnostics(results) {
    const output = toReviewdogDiagnostics(results);
    return output.map((o) => JSON.stringify(o)).join("\n");
}

module.exports = reportReviewdogDiagnostics;
module.exports.toJSON = toReviewdogDiagnostics;