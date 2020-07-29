package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.security.user.AdditionalInfoManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

/**
 * This controller handles the page for completing the user account creation.
 */
@Controller
public class AdditionalRegisterInformationController {

    private final AdditionalInfoManager additionalInfoManager;

    private final CountryService countryService;

    public AdditionalRegisterInformationController(AdditionalInfoManager additionalInfoManager,
                                                   CountryService countryService) {
        this.additionalInfoManager = additionalInfoManager;
        this.countryService = countryService;
    }

    /**
     * Render and display the page.
     *
     * @return the page containing the additional information of the user.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/additionalRegisterInfo")
    public String getAdditionalRegisterInfoPage(Model model) {
        UserFirstInfoDto userFirstInfoDto = new UserFirstInfoDto();
        // Adding the objects to the model
        model.addAttribute("userInfo", userFirstInfoDto);
        addCountriesToPage(model);
        // Returning the page with the information.
        return UserPageEnum.ADDITIONAL_INFO.getPage();
    }

    /**
     * Handles the
     *
     * @param userInfo the information of the user.
     * @param result   The information about the validation errors.
     * @return the redirection to the main page.
     */
    @Security(PrivilegeEnum.PLAY)
    @PostMapping("/additionalRegisterInfo")
    public String submitAdditionalRegisterInfoPage(@ModelAttribute("userInfo") @Valid UserFirstInfoDto userInfo,
                                                   BindingResult result, Model model) {
        if (result.hasErrors()) {
            addCountriesToPage(model);
            return UserPageEnum.ADDITIONAL_INFO.getPage();
        }
        // Adding the information to the user.
        additionalInfoManager.addUserInformation(userInfo);
        // Redirecting to the main page.
        return UserPageEnum.MAIN_PAGE.getRedirectToPage();
    }

    private void addCountriesToPage(Model model) {
        model.addAttribute("countries", countryService.getCountryList());
    }
}