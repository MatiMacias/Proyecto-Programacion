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

    dataTable.on ("rowClick", function(e, row){
            addItemToSelection(row.getData());
    });


    // Configuración de la segunda tabla para los ítems seleccionados
    const selectedItemsTable = new Tabulator("#ticket-section", {
        columns: [
            { title: "Name", field: "name" },
            { title: "Price", field: "price", formatter: "money" },
            {
                title: "Quantity",
                field: "quantity",
                editor: "number",
                cellEdited: function(cell){
                    updateRowTotal(cell.getRow());
                    updateTotalSum();
                }
            },
            {
                title:"Total",
                field:"total",
                formatter:"money",
                mutator: function(value, data){
                    return data.quantity * data.price;
                }
            },
            {
                title: "Action",
                field: "action",
                formatter: function(cell, formatterParams, onRendered){
                    return "<button class='delete-boton'>Delete</button>";
                },
            }
        ]
    });

    selectedItemsTable.on("cellClick",function(e, cell){
        if(e.target.classList.contains('delete-boton')){
            selectedItemsTable.deleteRow(cell.getRow().getIndex());
            updateTotalSum();
        }
    });

    
    

    // Función para agregar ítems seleccionados a la segunda tabla
    function addItemToSelection(item) {
        selectedItemsTable.addData({
            ...item,
            quantity:1,
            total: item.price
        });
        updateTotalSum();
    }


    function updateRowTotal(row){
        const data = row.getData();
        row.update({total: data.quantity * data.price});
    }

    function updateTotalSum(){
        let total = 0;
        selectedItemsTable.getData().forEach(function(row){
            total += row.total;
        });
        document.getElementById("total-sum").textContent = `$${total.toFixed(2)}`;
    }
});