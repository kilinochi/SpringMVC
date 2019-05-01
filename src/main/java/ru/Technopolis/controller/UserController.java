package ru.Technopolis.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import ru.Technopolis.domain.User;
import ru.Technopolis.service.SecurityService;
import ru.Technopolis.service.UserService;

@Controller
public class UserController {

    private final SecurityService securityService;

    private final UserService userService;

    public UserController(SecurityService securityService, UserService userService) {
        this.securityService = securityService;
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginUser(@AuthenticationPrincipal User user, Model model) {
        if (user != null) {
            return "redirect:/";
        } else {
            return "login";
        }
    }

    @PostMapping("/signup")
    public String registerUser(User user, Model model) {
        user.setUsername(user.getUsername().trim());
        user.setPassword(user.getPassword().trim());
        if (!user.getUsername().matches("^[A-Za-z0-9]{8,16}$")
                || !user.getPassword().matches("^[A-Za-z0-9]{8,16}$")) {
            model.addAttribute("after_signup_attempt", true);
            model.addAttribute("signup_input_error", true);
            return "login";
        }
        if (userService.loadUserByUsername(user.getUsername()) != null) {
            model.addAttribute("signup_exist_error", true);
            model.addAttribute("after_signup_attempt", true);
            return "login";
        } else {
            String userPassword = user.getPassword();
            userService.save(user);
            securityService.autoLogin(user.getUsername(), userPassword);
            return "redirect:/";
        }
    }

}
