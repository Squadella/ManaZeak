package org.manazeak.manazeak.controller.html.fragment.admin.user;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.security.admin.AdminUserService;
import org.manazeak.manazeak.service.security.user.badge.BadgeService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * This fragment displays the list of user of the application.
 */
@FragmentController
public class UserListFragment {

    private final AdminUserService adminUserService;
    public BadgeService badgeService;

    public UserListFragment(AdminUserService adminUserService, BadgeService badgeService) {
        this.adminUserService = adminUserService;
        this.badgeService = badgeService;
    }

    /**
     * Get the fragment containing the list of users available in the app.
     * It also includes available badges.
     * @return The fragment.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("/admin/user-list")
    public String getUserListFragment(Model model) {
        // Adding the list of users to the model.
        model.addAttribute("users", adminUserService.getUserList());
        // Adding the list of badges to the model.
        model.addAttribute("badges", badgeService.getBadgesList());
        // Returning the page.
        return AdminFragmentEnum.USER_LIST.getPage();
    }
}
