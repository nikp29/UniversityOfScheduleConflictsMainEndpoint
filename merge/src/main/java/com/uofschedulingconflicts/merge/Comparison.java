package com.uofschedulingconflicts.merge;

public class Comparison extends Thread {
    private int arrLen;
    private int currTime;
    private int eventLen;
    private int[] goodTimes;
    private int[][] users;

    /**
     * Constructor.
     */
    public Comparison(int arrLen, int currTime, int eventLen, int[] goodTimes, int[][] users) {
        this.arrLen = arrLen;
        this.currTime = currTime;
        this.eventLen = eventLen;
        this.goodTimes = goodTimes;
        this.users = users;
    }

    /**
     * Start the thread.
     */
    public void run() {
        boolean allGood = true;
        for (int j = 0; j < users.length; j++) {
            int[] user = users[j];
            if (!canInsertEvent(user, currTime, eventLen)) {
                allGood = false;
                break;
            }
        }
        if (allGood)
            goodTimes[currTime] = 2;
    }

    /**
     * Helper function to determine if an event can be inserted into a user's
     * calendar.
     */
    public boolean canInsertEvent(int[] user, int startTime, int eventLength) {
        int fifteenMinuteSegments = (int) Math.ceil(eventLength * 1.0 / 15);
        for (int i = 0; i < fifteenMinuteSegments; i++) {
            if (((startTime + i) < arrLen) && user[startTime + i] == 1) {
                return false;
            }
        }
        return true;
    }
}
