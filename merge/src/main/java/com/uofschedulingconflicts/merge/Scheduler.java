package com.uofschedulingconflicts.merge;

import java.util.concurrent.*;

public class Scheduler {
    private int arrLen = 13 * 4 * 7;

    public Scheduler(int arrLen) { // for testing purposes only.
        this.arrLen = arrLen;
    }

    /**
     * Main API call that returns an int[] of all available timings. Available
     * timings are marked with the int 2.
     */
    public int[] searchForTimes(int[][] users, int eventLen) {
        int[] goodTimes = new int[arrLen];
        ExecutorService executors = Executors.newFixedThreadPool(arrLen);
        for (int i = 0; i < arrLen; i++) {
            Comparison comp = new Comparison(arrLen, i, eventLen, goodTimes, users);
            executors.execute(comp);
        }
        return goodTimes;
    }

    /** Sequential Execution Shown Below, NOT NEEDED FOR PROGRAM */

    /**
     * Main API call that returns an int[] of all available timings. Available
     * timings are marked with the int 2.
     */
    public int[] searchForTimeSequential(int[][] users, int eventLength) {
        int[] goodTimes = new int[arrLen];
        for (int i = 0; i < arrLen; i++) {
            System.out.println("Time: " + i);
            boolean allGood = true;
            for (int j = 0; j < users.length; j++) {
                int[] user = users[j];
                System.out.println("User: " + j);
                if (!canInsertEventSequential(user, i, eventLength)) {
                    allGood = false;
                    break;
                }
            }
            if (allGood)
                goodTimes[i] = 2;
        }
        return goodTimes;
    }

    /**
     * Helper function to determine if an event can be inserted into a user's
     * calendar.
     */
    public boolean canInsertEventSequential(int[] user, int startTime, int eventLength) {
        int fifteenMinuteSegments = (int) Math.ceil(eventLength * 1.0 / 15);
        for (int i = 0; i < fifteenMinuteSegments; i++) {
            if (((startTime + i) < arrLen) && user[startTime + i] == 1) {
                System.out.println("Not good");
                return false;
            }
        }
        System.out.println("Good");
        return true;
    }

}
