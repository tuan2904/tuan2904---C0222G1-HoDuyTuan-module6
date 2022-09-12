public class Demo {
    public static void main(String[] args) {
        int[] arr={1,2,3,0,3,2,1};
        int n = arr.length/2;
        System.out.println(n);
        int kt =1;
        for (int i = 0; i < n; i++) {
            if (arr[i] != arr[n - i - 1]) {
                kt = 0;
                break;
            }
        }

        if (kt == 0) {
            System.out.println("Mảng một chiều vừa nhập không là mảng đối xứng");
        } else {
            System.out.println("Mảng một chiều vừa nhập là mảng đối xứng");
        }
}
}
