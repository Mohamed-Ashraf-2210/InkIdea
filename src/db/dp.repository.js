export const findOne = ({
    filter = {},
    select = "",
    options = {},
    model
} = {}) => {
    if (!model) {
        throw new Error("Model is required")
    }
    const query = model.findOne(filter).select(select)
    if (options?.lean) {
        query.lean(options.lean)
    }
    if (options?.populate) {
        query.populate(options.populate)
    }
    return query.exec()
}

export const findById = ({
    id,
    select = "",
    options = {},
    model
} = {}) => {
    if (!model) {
        throw new Error("Model is required")
    }
    const query = model.findById(id).select(select)
    if (options?.lean) {
        query.lean(options.lean)
    }
    if (options?.populate) {
        query.populate(options.populate)
    }
    return query.exec()
}

export const create = ({
    data,
    model
} = {}) => {
    if (!model) {
        throw new Error("Model is required")
    }
    if (!data) {
        throw new Error("Data is required")
    }
    return model.create(data)
}