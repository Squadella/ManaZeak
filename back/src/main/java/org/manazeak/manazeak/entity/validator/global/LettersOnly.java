package org.manazeak.manazeak.entity.validator.global;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Checks if a field has only letters.
 */
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LettersOnlyValidator.class)
public @interface LettersOnly {

    String message() default "{error.general.letters_only}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
