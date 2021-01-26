package com.harunugur.app.service;

import com.harunugur.app.entity.Group;
import com.harunugur.app.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    private GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository){
        this.groupRepository = groupRepository;
    }

    public List<Group> getAllGroups(){
        return groupRepository.findAll();
    }

    public Optional<Group> getGroup(Long id) {

       return groupRepository.findById(id);
    }

    public Group create(Group group) {

        return groupRepository.save(group);
    }

    public void deleteById(Long id) {
        groupRepository.deleteById(id);
    }
}
