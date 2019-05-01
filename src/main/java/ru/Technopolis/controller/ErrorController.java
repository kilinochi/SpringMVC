package ru.Technopolis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ErrorController {

    @GetMapping("/error")
    public String errorPage(HttpServletRequest httpServletRequest, Model model) {
        model.addAttribute("error", httpServletRequest.getAttribute("javax.servlet.error.status_code"));
        return "error";
    }

}
