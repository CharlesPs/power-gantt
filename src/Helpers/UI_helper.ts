
export const getTableWidth = (columns: any) => {

    const anchos = columns.map((column: any) => column.width)

    return anchos.reduce((suma: number, valor: number) => suma + valor)
}

export const getPercent = (num_as_100: number, num: number) => {

    return num * 100 / num_as_100
}

export default {
    getTableWidth,
    getPercent,
}
