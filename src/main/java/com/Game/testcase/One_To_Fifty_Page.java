package com.Game.testcase;

import org.openqa.selenium.By;
import com.Browsers.Util.AllBrowsers;

public class One_To_Fifty_Page extends AllBrowsers {

	public void One_To_Page_Method() throws InterruptedException {
		for (int i = 1; i <= 50; i++) {

			String numbers_xpath = "//div[text()='" + i + "']";

			driver.findElement(By.xpath(numbers_xpath)).click();

		}
		Thread.sleep(3000);

	}
}
