import java.util.HashMap;
import java.util.Map;

public class a {
    public static void main(String[] args) {
        String str = "abcasbcs";
        Map<Character, Integer> test = solution(str);
        for (Map.Entry<Character, Integer> key : test.entrySet()) {
            System.out.println("ky tự " + key.getKey() + " hiện " + key.getValue() + " lần");
        }
    }

    static Map<Character, Integer> solution(String str) {
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < str.length(); i++) {
            Integer n = map.get(str.charAt(i));
            if (n == null) {
                n = 0;
            }
            map.put(str.charAt(i), n + 1);
        }
        return map;
    }
}
