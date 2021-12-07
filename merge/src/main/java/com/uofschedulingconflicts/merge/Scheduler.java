package com.uofschedulingconflicts.merge;

import java.util.concurrent.*;

public class Scheduler {
    private int arrLen = 7 * 13;

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
}
