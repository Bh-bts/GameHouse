package com.Game.MainPage;

import org.openqa.selenium.support.PageFactory;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import com.Browsers.Util.AllBrowsers;
import com.Game.testcase.One_To_Fifty_Page;

public class One_To_Fifty_MainPage extends One_To_Fifty_Page {
	@Parameters("browser")
	@Test
	
	public void user1(String browser) throws InterruptedException {
		
		AllBrowsers.driver = AllBrowsers.startBrowser(browser, Weburl1);
		One_To_Fifty_Page blank1 = PageFactory.initElements(driver, One_To_Fifty_Page.class);
		blank1.One_To_Page_Method();
	}

}
