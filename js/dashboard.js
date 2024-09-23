/*dataTable.on ("rowClick", function(e, row){
    addItemToSelection(row.getData());
});*/


document.addEventListener("DOMContentLoaded", function() {
    // Datos de ejemplo para la tabla de datos
    const tableData = [
        { id: 1, name: "Item 1", price: 10 },
        { id: 2, name: "Item 2", price: 20 },
        { id: 3, name: "Item 3", price: 30 }
    ];

    // Crear la primera tabla con Tabulator
    const dataTable = new Tabulator("#tablaProductos", {
        data: tableData,
        columns: [
            { title: "Name", field: "name" },
            { title: "Price", field: "price", formatter: "money" }
        ],
    });

    // Mantener un registro de listas vacías para los botones (Lista 1, Lista 2, Lista 3)
    const lists = {
        1: [],
        2: [],
        3: []
    };

    // La lista activa al principio será la Lista 1
    let activeListId = 1;

    // Crear la segunda tabla para los ítems seleccionados (lista activa)
    const selectedItemsTable = new Tabulator("#ticket-section", {
        columns: [
            { title: "Name", field: "name" },
            { title: "Price", field: "price", formatter: "money" },
            {
                title: "Quantity",
                field: "quantity",
                editor: "number",
                cellEdited: function(cell) {
                    updateRowTotal(cell.getRow());
                    updateTotalSum();
                }
            },
            {
                title: "Total",
                field: "total",
                formatter: "money",
                mutator: function(value, data) {
                    return data.quantity * data.price;
                }
            },
            {
                title: "Action",
                field: "action",
                formatter: function(cell, formatterParams, onRendered) {
                    return "<button class='delete-boton'>Delete</button>";
                }
            }
        ]
    });

    // Cambiar entre listas activas al hacer clic en los botones
    document.querySelectorAll(".grid-button").forEach(function(button) {
        button.addEventListener("click", function() {
            activeListId = button.getAttribute("data-list-id");
            loadActiveList();
        });
    });

    // Cargar la lista activa en la tabla del segundo section
    function loadActiveList() {
        const currentList = lists[activeListId];
        selectedItemsTable.clearData();
        selectedItemsTable.setData(currentList);
        updateTotalSum();  // Actualizar el total cuando se cambia de lista
    }

    // Agregar ítems seleccionados de la primera tabla a la lista activa
    dataTable.on("rowClick", function(e, row) {
        addItemToSelection(row.getData());
    });

    // Función para agregar ítems seleccionados a la lista activa
    function addItemToSelection(item) {
        const currentList = lists[activeListId];

        // Verificar si el ítem ya existe en la lista activa
        const existingItem = currentList.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;  // Incrementar la cantidad si ya existe
            existingItem.total = existingItem.quantity * existingItem.price;  // Actualizar el total
        } else {
            // Agregar nuevo ítem con cantidad = 1
            currentList.push({
                ...item,
                quantity: 1,
                total: item.price
            });
        }

        // Actualizar la tabla y la suma total
        loadActiveList();
    }

    // Función para actualizar el total por fila
    function updateRowTotal(row) {
        const data = row.getData();
        row.update({ total: data.quantity * data.price });

        // Actualizar la lista en memoria
        const currentList = lists[activeListId];
        const itemIndex = currentList.findIndex(i => i.id === data.id);
        if (itemIndex >= 0) {
            currentList[itemIndex] = data;  // Actualizar la lista en memoria
        }
    }

    // Función para calcular y actualizar la suma total
    function updateTotalSum() {
        let total = 0;
        selectedItemsTable.getData().forEach(function(row) {
            total += row.total;
        });
        document.getElementById("total-sum").textContent = `$${total.toFixed(2)}`;
    }

    // Eliminar un ítem de la lista activa y actualizar el total
    selectedItemsTable.on("cellClick", function(e, cell) {
        if (e.target.classList.contains('delete-boton')) {
            const row = cell.getRow();
            const rowData = row.getData();

            // Eliminar el ítem de la lista activa
            lists[activeListId] = lists[activeListId].filter(item => item.id !== rowData.id);

            row.delete();
            updateTotalSum();
        }
    });
});