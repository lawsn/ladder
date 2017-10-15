import java.util.Random;

public class Ladder {
	public static void main(String[] args) {
		
		StringBuilder sb = new StringBuilder();
		
		int maximum = 9;
		int players = 6;
		
		String[][] ladder = new String[maximum][players - 1];
		
		for(int i=0; i<maximum; i++) {

			sb.append("\t\t\t").append("<tr>").append("\n");
			
			boolean isLean = false;
			for(int p=0; p<players - 1; p++) {
				
				if(isLean) {
					isLean = false;
					ladder[i][p] = "____";
				}else {
					isLean = lean();
					ladder[i][p] = isLean ? "lean" : "____";
				}
				
				sb.append("\t\t\t\t").append("<td");
				sb.append(" class=\"").append(ladder[i][p]).append("\"");
				sb.append("></td>").append("\n");
				
			}
			
			sb.append("\t\t\t").append("</tr>").append("\n");
		}
		
		System.out.println(sb.toString());
		
		System.out.println(get(0, ladder));
		System.out.println(get(1, ladder));
		System.out.println(get(2, ladder));
		System.out.println(get(3, ladder));
		System.out.println(get(4, ladder));
		System.out.println(get(5, ladder));
	}
	
	private static Random rand = new Random();
	public static boolean lean() {
		if(rand.nextInt(101) < 40) {
			return true;
		}
		return false;
	}
	
	public static int get(int mascot, String[][] ladder) {
		
		int maximum = ladder[0].length;
		
		for(int i=0; i<ladder.length; i++) {
			if(mascot < maximum && "lean".equals(ladder[i][mascot])) {
				mascot += 1;
			}else if(mascot > 0 && "lean".equals(ladder[i][mascot - 1])) {
				mascot -= 1;
			}
		}
		
		return mascot;
	}	
}
