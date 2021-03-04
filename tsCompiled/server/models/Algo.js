"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const algoSchema = new Schema({
    algoName: { type: String, required: true },
    question: { type: String, required: true },
    tests: { type: String, required: true },
});
module.exports = mongoose.model('prompts', algoSchema);
//# sourceMappingURL=Algo.js.map