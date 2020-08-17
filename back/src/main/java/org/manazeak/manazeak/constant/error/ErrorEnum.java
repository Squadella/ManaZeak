package org.manazeak.manazeak.constant.error;

/**
 * This enum contains the possible errors of the application.
 */
public enum ErrorEnum {

    /**
     * The asked user desn't exists in the database.
     */
    USER_NOT_FOUND("database.error.user_not_found");

    private final String key;

    ErrorEnum(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
