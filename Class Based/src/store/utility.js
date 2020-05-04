export const getOrders = (data) => {
    const orders = []
    for (const key in data) {
        orders.push({
            ...data[key],
            id: key,
        })
    }
    return orders
}
