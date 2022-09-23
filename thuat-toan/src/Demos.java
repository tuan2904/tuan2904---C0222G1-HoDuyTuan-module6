import java.sql.Array;
import java.util.Arrays;

public class Demos {
    public static void main(String[] args) {
        int count = 0;
        int[] arr = {3, 4, 5, 3, 4, 5, 6,6};
        for (int i : arr) {
            count ^= i;
        }

        System.out.println("Kee " + count);
    }
}