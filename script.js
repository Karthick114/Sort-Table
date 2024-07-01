// script.js
function sortTable(ascending) {
    var columnIndex = document.getElementById("columnIndex").value;
    var sortValue = document.getElementById("sortValue").value.trim().toLowerCase();
    var alertBox = document.getElementById("alert");

    if (columnIndex === "") {
        showAlert("Please enter a column index.");
        return;
    }

    columnIndex = parseInt(columnIndex);
    if (isNaN(columnIndex) || columnIndex < 0 || columnIndex > 3) {
        showAlert("Please enter a valid column index between 0 and 3.");
        return;
    }

    hideAlert();

    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("sortableTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            var xValue = x.innerHTML.trim().toLowerCase();
            var yValue = y.innerHTML.trim().toLowerCase();

            if (sortValue) {
                if (xValue.includes(sortValue) && !yValue.includes(sortValue)) {
                    shouldSwitch = !ascending;
                    break;
                } else if (!xValue.includes(sortValue) && yValue.includes(sortValue)) {
                    shouldSwitch = ascending;
                    break;
                }
            } else {
                if (ascending) {
                    if (isNumeric(xValue) && isNumeric(yValue)) {
                        if (parseFloat(xValue) > parseFloat(yValue)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (xValue > yValue) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                } else {
                    if (isNumeric(xValue) && isNumeric(yValue)) {
                        if (parseFloat(xValue) < parseFloat(yValue)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (xValue < yValue) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function showAlert(message) {
    var alertBox = document.getElementById("alert");
    alertBox.style.display = "block";
    alertBox.innerHTML = message;
}

function hideAlert() {
    var alertBox = document.getElementById("alert");
    alertBox.style.display = "none";
}
