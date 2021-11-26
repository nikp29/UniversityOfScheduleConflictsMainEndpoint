package com.uofschedulingconflicts.merge;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ScheduleController {
    
    @RequestMapping("/merge")
    public @ResponseBody Map<String, Object> mergeSchedules (@RequestBody Map<String, Object> input){
        ArrayList<ArrayList<Integer>> schedulesAL = (ArrayList<ArrayList<Integer>>) input.get("schedules");
        int eventLen = (int) input.get("eventLen");

        int[][]schedules = new int[schedulesAL.size()][];
        for(int i = 0; i < schedules.length; i++){
            schedules[i] = new int[schedulesAL.get(i).size()];
            for (int j = 0; j < schedules[i].length; j++){
                schedules[i][j] = schedulesAL.get(i).get(j);
            }
        }

        Scheduler s = new Scheduler(13 * 4 * 7);
        int[] merged = s.searchForTimes(schedules, eventLen);

        Map<String, Object> output = new HashMap<String, Object>();
        output.put("mergedSchedule", merged);
        return output;
    }


}
