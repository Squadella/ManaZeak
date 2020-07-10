package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

/**
 * This controller allows users to create an account into the application.
 */
@Controller
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Display the registration form.
     *
     * @param model the object to pass to thymeleaf to fill.
     * @return the register page.
     */
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        NewUserDto userDto = new NewUserDto();
        model.addAttribute("user", userDto);
        return UserPageEnum.REGISTER_PAGE.getPage();
    }

    /**
     * Adding a new user into the app.
     *
     * @param newUser This field is tested. If there is an error, the user cannot be created.
     * @param result  The error for thymeleaf to display errors.
     * @return The register page if the user fail to register. The main page if he registered successfully.
     */
    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") @Valid NewUserDto newUser, BindingResult result) {
        // trying to create a user into the database.
        if (result.hasErrors()) {
            return UserPageEnum.REGISTER_PAGE.getPage();
        }
        MzkUser user = userService.createUser(newUser);
        return UserPageEnum.REGISTER_PAGE.getPage();
    }
}
