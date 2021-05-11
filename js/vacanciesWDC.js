//var { ClickHouse } = require('clickhouse');
//const stream = require('stream');

(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "query_string",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "level",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "direction",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "vacancy_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "premium",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "has_test",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "response_url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "address_lat",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "address_lng",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "address_raw",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "alternate_url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "salary_from",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "salary_to",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "salary_currency",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "salary_gross",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "insider_interview_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "insider_interview_url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "area_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "area_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "published_at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "employer_url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "employer_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "employer_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "response_letter_required",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "type_id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "archived",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "schedule_id",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "vacancies",
            alias: "Vacancies from headhunter",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {


        $.getJSON("https://drive.google.com/file/d/1_SDT07iquU9qAa34svtBvqoytbDRBsos", function(resp) {
        var feat = resp.features,
            tableData = [];

        for (var i = 0; i < feat.length; i++) {
            tableData.push({
                "query_string": feat[i].query_string,
                "type": feat[i].type,
                "level": feat[i].level,
                "direction": feat[i].direction,
                "vacancy_id": feat[i].vacancy_id,
                "premium": feat[i].premium,
                "has_test": feat[i].has_test,
                "response_url": feat[i].response_url,
                "address_lat": feat[i].address_lat,
                "address_lng": feat[i].address_lng,
                "address_raw": feat[i].address_raw,
                "alternate_url": feat[i].alternate_url,
                "salary_from": feat[i].salary_from,
                "salary_to": feat[i].salary_to,
                "salary_currency": feat[i].salary_currency,
                "salary_gross": feat[i].salary_gross,
                "name": feat[i].name,
                "insider_interview_id": feat[i].insider_interview_id,
                "insider_interview_url": feat[i].insider_interview_url,
                "area_id": feat[i].area_id,
                "area_name": feat[i].area_name,
                "url": feat[i].url,
                "published_at": feat[i].published_at,
                "employer_url": feat[i].employer_url,
                "employer_name": feat[i].employer_name,
                "employer_id": feat[i].employer_id,
                "response_letter_required": feat[i].response_letter_required,
                "type_id": feat[i].type_id,
                "type_name": feat[i].type_name,
                "archived": feat[i].archived,
                "schedule_id": feat[i].schedule_id
            });
        }
        table.appendRows(tableData);
        doneCallback();
        });
    //const { ClickHouse } = requirejs(['clickhouse']);
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Vacancies from headhunter"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
