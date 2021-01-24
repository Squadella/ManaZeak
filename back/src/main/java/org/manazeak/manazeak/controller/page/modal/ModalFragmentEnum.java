package org.manazeak.manazeak.controller.page.modal;

/**
 * Contains all the modal urls.
 */
public enum ModalFragmentEnum {
    ABOUT_MODAL("fragments/modal/about.html"),
    NEW_BADGE_MODAL("fragments/modal/badge-creation.html");

    private final String page;

    ModalFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
