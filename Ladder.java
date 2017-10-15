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
	}
	
	private static Random rand = new Random();
	public static boolean lean() {
		if(rand.nextInt(101) < 40) {
			return true;
		}
		return false;
	}
}
