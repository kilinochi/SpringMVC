package ru.Technopolis.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import ru.Technopolis.model.User;
import ru.Technopolis.service.UserService;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/signup")
    public String signup() {
        return "/signup";
    }

    @PostMapping(value = "/signup")
    public String signup(User user, Model model) {
        boolean isValid = true;
        model.addAttribute("username", user.getUsername());
        model.addAttribute("email", user.getEmail());
        model.addAttribute("password", user.getPassword());
        if (userService.findByEmail(user.getEmail()) != null) {
            model.addAttribute("userExist", true);
            isValid = false;
        }
        if (user.getUsername().length() < 6 || user.getUsername().length() > 20) {
            model.addAttribute("invalidUsername", true);
            isValid = false;
        }
        if (!user.getEmail().matches("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")) {
            model.addAttribute("invalidEmail", true);
            isValid = false;
        }
        if (user.getPassword().length() < 8 || user.getPassword().length() > 20) {
            model.addAttribute("invalidPassword", true);
            isValid = false;
        }
        if (!isValid) {
            return "/signup";
        }
        userService.save(user);
        return "redirect:/signin";
    }

    @GetMapping(value = "/signin")
    public String signin(Principal principal) {
        return "/signin";
    }
}
