package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.user.UserService;
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

    private static final String REGISTER_PAGE = "user/register.html";

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        NewUserDto userDto = new NewUserDto();
        model.addAttribute("user", userDto);
        return REGISTER_PAGE;
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") @Valid NewUserDto newUser, BindingResult result) {
        // trying to create a user into the database.
        if (result.hasErrors()) {
            return REGISTER_PAGE;
        }
        MzkUser user = userService.createUser(newUser);
        return REGISTER_PAGE;
    }
}
