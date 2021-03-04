declare const _exports: {
    new (doc?: any): mongoose.Document<any>;
    aggregate<R = any>(pipeline?: any[] | undefined): mongoose.Aggregate<R[]>;
    aggregate<R_1 = any>(pipeline: any[], cb: Function): Promise<R_1[]>;
    base: typeof mongoose;
    baseModelName: string | undefined;
    bulkWrite(writes: any[], options?: import("mongodb").CollectionBulkWriteOptions | undefined): Promise<import("mongodb").BulkWriteOpResultObject>;
    bulkWrite(writes: any[], options?: import("mongodb").CollectionBulkWriteOptions | undefined, cb?: ((err: any, res: import("mongodb").BulkWriteOpResultObject) => void) | undefined): void;
    collection: mongoose.Collection;
    count(callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<number, mongoose.Document<any>>;
    count(filter: mongoose.FilterQuery<mongoose.Document<any>>, callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<number, mongoose.Document<any>>;
    countDocuments(callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<number, mongoose.Document<any>>;
    countDocuments(filter: mongoose.FilterQuery<mongoose.Document<any>>, callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<number, mongoose.Document<any>>;
    create(doc: mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>): Promise<mongoose.Document<any>>;
    create(docs: (mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>)[], options?: mongoose.SaveOptions | undefined): Promise<mongoose.Document<any>[]>;
    create(docs: (mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>)[], callback: (err: mongoose.CallbackError, docs: mongoose.Document<any>[]) => void): void;
    create(doc: mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>, callback: (err: mongoose.CallbackError, doc: mongoose.Document<any>) => void): void;
    create<DocContents = mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>>(docs: DocContents[], options?: mongoose.SaveOptions | undefined): Promise<mongoose.Document<any>[]>;
    create<DocContents_1 = mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>>(doc: DocContents_1): Promise<mongoose.Document<any>>;
    create<DocContents_2 = mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>>(...docs: DocContents_2[]): Promise<mongoose.Document<any>[]>;
    create<DocContents_3 = mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>>(docs: DocContents_3[], callback: (err: mongoose.CallbackError, docs: mongoose.Document<any>[]) => void): void;
    create<DocContents_4 = mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>>(doc: DocContents_4, callback: (err: mongoose.CallbackError, doc: mongoose.Document<any>) => void): void;
    createCollection(options?: import("mongodb").CollectionCreateOptions | undefined): Promise<import("mongodb").Collection<mongoose.Document<any>>>;
    createCollection(options: import("mongodb").CollectionCreateOptions | null, callback: (err: mongoose.CallbackError, collection: import("mongodb").Collection<mongoose.Document<any>>) => void): void;
    createIndexes(callback?: ((err: any) => void) | undefined): Promise<void>;
    createIndexes(options?: any, callback?: ((err: any) => void) | undefined): Promise<void>;
    db: mongoose.Connection;
    deleteMany(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | undefined, callback?: ((err: mongoose.CallbackError) => void) | undefined): mongoose.Query<{
        ok?: number | undefined;
        n?: number | undefined;
    } & {
        deletedCount?: number | undefined;
    }, mongoose.Document<any>>;
    deleteOne(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | undefined, callback?: ((err: mongoose.CallbackError) => void) | undefined): mongoose.Query<{
        ok?: number | undefined;
        n?: number | undefined;
    } & {
        deletedCount?: number | undefined;
    }, mongoose.Document<any>>;
    ensureIndexes(callback?: ((err: any) => void) | undefined): Promise<void>;
    ensureIndexes(options?: any, callback?: ((err: any) => void) | undefined): Promise<void>;
    events: NodeJS.EventEmitter;
    findById(id: any, projection?: any, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: mongoose.CallbackError, doc: mongoose.Document<any> | null) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findOne(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, projection?: any, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: mongoose.CallbackError, doc: mongoose.Document<any> | null) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    hydrate(obj: any): mongoose.Document<any>;
    init(callback?: ((err: any) => void) | undefined): Promise<mongoose.Document<any>>;
    insertMany(doc: mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>, options: mongoose.InsertManyOptions & {
        rawResult: true;
    }): Promise<mongoose.InsertManyResult>;
    insertMany(doc: mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>, options?: mongoose.InsertManyOptions | undefined): Promise<mongoose.Document<any>>;
    insertMany(docs: (mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>)[], options: mongoose.InsertManyOptions & {
        rawResult: true;
    }): Promise<mongoose.InsertManyResult>;
    insertMany(docs: (mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>)[], options?: mongoose.InsertManyOptions | undefined): Promise<mongoose.Document<any>[]>;
    insertMany(doc: mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>, options?: mongoose.InsertManyOptions | undefined, callback?: ((err: mongoose.CallbackError, res: mongoose.Document<any> | mongoose.InsertManyResult) => void) | undefined): void;
    insertMany(docs: (mongoose.Document<any> | mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>)[], options?: mongoose.InsertManyOptions | undefined, callback?: ((err: mongoose.CallbackError, res: mongoose.Document<any>[] | mongoose.InsertManyResult) => void) | undefined): void;
    listIndexes(callback: (err: mongoose.CallbackError, res: any[]) => void): void;
    listIndexes(): Promise<any[]>;
    modelName: string;
    populate(docs: any[], options: string | mongoose.PopulateOptions | mongoose.PopulateOptions[], callback?: ((err: any, res: mongoose.Document<any>[]) => void) | undefined): Promise<mongoose.Document<any>[]>;
    populate(doc: any, options: string | mongoose.PopulateOptions | mongoose.PopulateOptions[], callback?: ((err: any, res: mongoose.Document<any>) => void) | undefined): Promise<mongoose.Document<any>>;
    syncIndexes(options?: Record<string, unknown> | undefined): Promise<string[]>;
    syncIndexes(options: Record<string, unknown> | null, callback: (err: mongoose.CallbackError, dropped: string[]) => void): void;
    startSession(options?: import("mongodb").SessionOptions | undefined, cb?: ((err: any, session: import("mongodb").ClientSession) => void) | undefined): Promise<import("mongodb").ClientSession>;
    validate(callback?: ((err: any) => void) | undefined): Promise<void>;
    validate(optional: any, callback?: ((err: any) => void) | undefined): Promise<void>;
    validate(optional: any, pathsToValidate: string[], callback?: ((err: any) => void) | undefined): Promise<void>;
    watch(pipeline?: Record<string, unknown>[] | undefined, options?: import("mongodb").ChangeStreamOptions | undefined): import("mongodb").ChangeStream<any>;
    $where(argument: string | Function): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    discriminators: {
        [name: string]: mongoose.Model<any>;
    } | undefined;
    translateAliases(raw: any): any;
    discriminator<D extends mongoose.Document<any>>(name: string, schema: mongoose.Schema<mongoose.Document<any>, mongoose.Model<mongoose.Document<any>>, undefined>, value?: string | undefined): mongoose.Model<D>;
    distinct(field: string, filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<any[], mongoose.Document<any>>;
    estimatedDocumentCount(options?: mongoose.QueryOptions | undefined, callback?: ((err: any, count: number) => void) | undefined): mongoose.Query<number, mongoose.Document<any>>;
    exists(filter: mongoose.FilterQuery<mongoose.Document<any>>): Promise<boolean>;
    exists(filter: mongoose.FilterQuery<mongoose.Document<any>>, callback: (err: any, res: boolean) => void): void;
    find(callback?: ((err: any, docs: mongoose.Document<any>[]) => void) | undefined): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    find(filter: mongoose.FilterQuery<mongoose.Document<any>>, callback?: ((err: any, docs: mongoose.Document<any>[]) => void) | undefined): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    find(filter: mongoose.FilterQuery<mongoose.Document<any>>, projection?: any, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, docs: mongoose.Document<any>[]) => void) | undefined): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    findByIdAndDelete(id?: any, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findByIdAndRemove(id?: any, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findByIdAndUpdate(id: any, update: mongoose.UpdateQuery<mongoose.Document<any>>, options: mongoose.QueryOptions & {
        rawResult: true;
    }, callback?: ((err: any, doc: import("mongodb").FindAndModifyWriteOpResultObject<mongoose.Document<any>>, res: any) => void) | undefined): mongoose.Query<import("mongodb").FindAndModifyWriteOpResultObject<mongoose.Document<any>>, mongoose.Document<any>>;
    findByIdAndUpdate(id: any, update: mongoose.UpdateQuery<mongoose.Document<any>>, options: mongoose.QueryOptions & {
        upsert: true;
    } & mongoose.ReturnsNewDoc, callback?: ((err: any, doc: mongoose.Document<any>, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any>, mongoose.Document<any>>;
    findByIdAndUpdate(id?: any, update?: mongoose.UpdateQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findOneAndDelete(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findOneAndRemove(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findOneAndReplace(filter: mongoose.FilterQuery<mongoose.Document<any>>, replacement: mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>>, options: mongoose.QueryOptions & {
        upsert: true;
    } & mongoose.ReturnsNewDoc, callback?: ((err: any, doc: mongoose.Document<any>, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any>, mongoose.Document<any>>;
    findOneAndReplace(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, replacement?: mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    findOneAndUpdate(filter: mongoose.FilterQuery<mongoose.Document<any>>, update: mongoose.UpdateQuery<mongoose.Document<any>>, options: mongoose.QueryOptions & {
        rawResult: true;
    }, callback?: ((err: any, doc: import("mongodb").FindAndModifyWriteOpResultObject<mongoose.Document<any>>, res: any) => void) | undefined): mongoose.Query<import("mongodb").FindAndModifyWriteOpResultObject<mongoose.Document<any>>, mongoose.Document<any>>;
    findOneAndUpdate(filter: mongoose.FilterQuery<mongoose.Document<any>>, update: mongoose.UpdateQuery<mongoose.Document<any>>, options: mongoose.QueryOptions & {
        upsert: true;
    } & mongoose.ReturnsNewDoc, callback?: ((err: any, doc: mongoose.Document<any>, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any>, mongoose.Document<any>>;
    findOneAndUpdate(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, update?: mongoose.UpdateQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, doc: mongoose.Document<any> | null, res: any) => void) | undefined): mongoose.Query<mongoose.Document<any> | null, mongoose.Document<any>>;
    geoSearch(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, options?: mongoose.GeoSearchOptions | undefined, callback?: ((err: mongoose.CallbackError, res: mongoose.Document<any>[]) => void) | undefined): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    mapReduce<Key, Value>(o: mongoose.MapReduceOptions<mongoose.Document<any>, Key, Value>, callback?: ((err: any, res: any) => void) | undefined): Promise<any>;
    remove(filter?: any, callback?: ((err: mongoose.CallbackError) => void) | undefined): mongoose.Query<any, mongoose.Document<any>>;
    replaceOne(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, replacement?: mongoose._AllowStringsForIds<mongoose.LeanDocument<mongoose.Document<any>>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, res: any) => void) | undefined): mongoose.Query<any, mongoose.Document<any>>;
    schema: mongoose.Schema<mongoose.Document<any>, mongoose.Model<mongoose.Document<any>>, undefined>;
    update(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, update?: mongoose.UpdateQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, res: any) => void) | undefined): mongoose.Query<any, mongoose.Document<any>>;
    updateMany(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, update?: mongoose.UpdateQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, res: any) => void) | undefined): mongoose.Query<{
        ok: number;
        n: number;
        nModified: number;
    }, mongoose.Document<any>>;
    updateOne(filter?: mongoose.FilterQuery<mongoose.Document<any>> | undefined, update?: mongoose.UpdateQuery<mongoose.Document<any>> | undefined, options?: mongoose.QueryOptions | null | undefined, callback?: ((err: any, res: any) => void) | undefined): mongoose.Query<{
        ok: number;
        n: number;
        nModified: number;
    }, mongoose.Document<any>>;
    where(path: string, val?: any): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    where(obj: object): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    where(): mongoose.Query<mongoose.Document<any>[], mongoose.Document<any>>;
    addListener(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    on(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    once(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    off(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    removeAllListeners(event?: string | symbol | undefined): mongoose.Model<mongoose.Document<any>>;
    setMaxListeners(n: number): mongoose.Model<mongoose.Document<any>>;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    listenerCount(event: string | symbol): number;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): mongoose.Model<mongoose.Document<any>>;
    eventNames(): (string | symbol)[];
};
export = _exports;
import mongoose = require("mongoose");
