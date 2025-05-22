package com.example.tasktracker.controller;

import com.example.tasktracker.model.Task;
import com.example.tasktracker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")


public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

//    @PutMapping("/{id}")
//    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask){
//        Optional<Task> optionalTask = taskRepository.findById(id);
//        if(optionalTask.isPresent()){
//            Task task = optionalTask.get();
//            task.setTitle(updatedTask.getTitle());
//            task.setCompleted(updatedTask.isCompleted());
//            return taskRepository.save(task);
//        }else {
//            throw new RuntimeException("Task not found with ID " + id);
//        }
//    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(task);
        } else {
            throw new RuntimeException("Task not found with ID " + id);
        }
    }

    @PutMapping("/{id}/toggle")

    public Task toggleTask(@PathVariable Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }

}
