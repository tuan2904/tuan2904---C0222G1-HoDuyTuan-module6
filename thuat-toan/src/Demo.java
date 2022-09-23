import java.util.*;

class Demo {

    public static void main(String[] args) {
//        String ta = "A ";
//        ta = ta.concat("B ");
//        String tb = "C ";
//        ta = ta.concat(tb);
//        ta.replace('C', 'D');
//        System.out.println(ta);
//        ta = ta.concat(tb);
//        System.out.println(ta);

        StringBuilder sb = new StringBuilder(5);
        String s ="";
        if (sb.equals(s)){
            System.out.println("Math 1");
        }else if (sb.toString().equals(s.toString())){
            System.out.println("Math 2");
        }else {
            System.out.println("No Math");
        }
    }
}