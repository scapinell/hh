//import clickhouse from 'clickhouse';

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
        $.getJSON("https://drive.google.com/file/d/1_SDT07iquU9qAa34svtBvqoytbDRBsos/view", function(resp) {
        var feat = resp.features,
            tableData = [];

        for (var i = 0; i < vacancies_json.length; i++) {
            tableData.push({
                "query_string": vacancies_json[i].query_string,
                "type": vacancies_json[i].type,
                "level": vacancies_json[i].level,
                "direction": vacancies_json[i].direction,
                "vacancy_id": vacancies_json[i].vacancy_id,
                "premium": vacancies_json[i].premium,
                "has_test": vacancies_json[i].has_test,
                "response_url": vacancies_json[i].response_url,
                "address_lat": vacancies_json[i].address_lat,
                "address_lng": vacancies_json[i].address_lng,
                "address_raw": vacancies_json[i].address_raw,
                "alternate_url": vacancies_json[i].alternate_url,
                "salary_from": vacancies_json[i].salary_from,
                "salary_to": vacancies_json[i].salary_to,
                "salary_currency": vacancies_json[i].salary_currency,
                "salary_gross": vacancies_json[i].salary_gross,
                "name": vacancies_json[i].name,
                "insider_interview_id": vacancies_json[i].insider_interview_id,
                "insider_interview_url": vacancies_json[i].insider_interview_url,
                "area_id": vacancies_json[i].area_id,
                "area_name": vacancies_json[i].area_name,
                "url": vacancies_json[i].url,
                "published_at": vacancies_json[i].published_at,
                "employer_url": vacancies_json[i].employer_url,
                "employer_name": vacancies_json[i].employer_name,
                "employer_id": vacancies_json[i].employer_id,
                "response_letter_required": vacancies_json[i].response_letter_required,
                "type_id": vacancies_json[i].type_id,
                "type_name": vacancies_json[i].type_name,
                "archived": vacancies_json[i].archived,
                "schedule_id": vacancies_json[i].schedule_id
            });
        }
        table.appendRows(vacancies_json);
        doneCallback();
        });
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
