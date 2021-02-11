package com.harunugur.app.exception.handle;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ApiError {

    private HttpStatus status;
    private String message;
    private List<String> errors;

}
