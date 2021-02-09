package com.harunugur.app.controller;

import com.harunugur.app.entity.Group;
import com.harunugur.app.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/groups")
    public ResponseEntity<List<Group>> getAllGroups() {
        log.info("Request to get groups");
        List<Group> groups = groupService.getAllGroups();
        return new ResponseEntity<List<Group>>(groups, HttpStatus.OK);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable  Long id) {
        log.info("Request to get group: {}", id);
        Group group = groupService.getGroup(id).orElse(null);

        return new ResponseEntity<Group>(group,HttpStatus.OK);
    }

    @PostMapping("/group/create")
    public ResponseEntity<?> create(@Valid @RequestBody Group group) throws URISyntaxException {
        log.info("Request to create group: {}", group);
        Group result = groupService.create(group);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/group/update")
    public ResponseEntity<?> update(@Valid @RequestBody Group group){
        log.info("Request to update group: {}", group);
        Group result = groupService.create(group);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        groupService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
