package com.Game.testcase;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import com.Browsers.Util.AllBrowsers;

public class One_To_Fifty_Page extends AllBrowsers {

	public void One_To_Page_Method() throws InterruptedException {
		
		JavascriptExecutor js = (JavascriptExecutor)driver;
		
		for (int i = 1; i <= 50; i++) {

			String numbers_xpath = "//div[text()='" + i + "']";
			//js.executeScript("arguments[0].scrollIntoView(true);", numbers_xpath);
			driver.findElement(By.xpath(numbers_xpath)).click();

		}
		Thread.sleep(3000);

	}
}
