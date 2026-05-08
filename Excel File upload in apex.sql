DECLARE
    l_blob      BLOB;
    l_file_name VARCHAR2(500);
BEGIN
    -- HEADER_ID check
    IF :P110_HEADER_ID IS NULL THEN
        apex_error.add_error(
            p_message          => 'Header ID missing hai!',
            p_display_location => apex_error.c_inline_in_notification
        );
        RETURN;
    END IF;

    -- File naam item se nahi, 
    -- seedha temp table se latest file lo
    BEGIN
        SELECT name, blob_content
        INTO l_file_name, l_blob
        FROM apex_application_temp_files
        WHERE created_on = (
            SELECT MAX(created_on)
            FROM apex_application_temp_files
        )
        AND ROWNUM = 1;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            apex_error.add_error(
                p_message          => 'Koi file upload nahi hui. Pehle file select karein!',
                p_display_location => apex_error.c_inline_in_notification
            );
            RETURN;
    END;

    -- Extension check
    IF LOWER(SUBSTR(l_file_name, INSTR(l_file_name, '.') + 1)) 
       NOT IN ('xlsx', 'csv') THEN
        apex_error.add_error(
            p_message          => 'Sirf .xlsx ya .csv file upload karein!',
            p_display_location => apex_error.c_inline_in_notification
        );
        RETURN;
    END IF;

    -- Purane records delete karo
    DELETE FROM PWC_ONT_WVN_SIZEWISE_DETAILS_L
    WHERE HEADER_ID = :P110_HEADER_ID;

    -- Parse aur Insert
    FOR rec IN (
        SELECT *
        FROM TABLE(
            apex_data_parser.parse(
                p_content   => l_blob,
                p_file_name => l_file_name
            )
        )
        WHERE line_number > 1
    )
    LOOP
        INSERT INTO PWC_ONT_WVN_SIZEWISE_DETAILS_L (
            HEADER_ID,
            GARMENT_INSEAM,
            GARMENT_SIZE,
            GARMENT_QTY,
            GARMENT_SIZE_QTY
        )
        VALUES (
            :P110_HEADER_ID,
            rec.col001,
            rec.col002,
            rec.col003,
            rec.col004
        );
    END LOOP;

    apex_application.g_print_success_message :=
        'File [' || l_file_name || '] - Header ID ' || 
        :P110_HEADER_ID || ' ke against successfully upload ho gaya!';

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        apex_error.add_error(
            p_message          => 'Error: ' || SQLERRM,
            p_display_location => apex_error.c_inline_in_notification
        );
END;

