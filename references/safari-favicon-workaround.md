2023-12-24
[Posted to Stack Overflow](https://stackoverflow.com/questions/76832751/how-to-avoid-safari-favicon-ico-error-for-local-html-files/77712950#77712950)

Safari tries to load a non-existent favicon.ico from the file system root when it opens HTML pages directly without a web server

I have discovered a **3 workarounds** for this issue.


**First Method**

This method uses Safari's Inspector to **suppress the error**. Essentially you'll be instructing Safari's Web Inspector to block the request for the `file:///favicon.ico`

To do this:
 1. Empty your browser cache using `⌘⌥E` (Command+Option+E)
 2. Force the page to Reload using `⌘⌥R` (Command+Option+R)
 3. Open the Web Inspector using `⌘⌥I` (Command+Option+I)
 4. The Web Inspector indicates an error with a red stop sign with an × in it
 5. Click on the **Sources** tab
 6. The problem `favicon.ico` file will be shown in the file list on the left-hand side
 7. Right-click the file and select **Block Request URL**
 8. Reload the page, the favicon.ico file will still appear in the list with a blocked resource icon next to it but the error will be gone
This will persist through page reloads until you remove the block by navigating to the file again in the Sources tab, right-clicking and selecting **Delete Local Override**; the **Console** tab will show a message "Web Inspector blocked file:///favicon.ico from loading"

**Second Method**

Safari seems to be hard-coded to look for `favicon.ico` at the root of the file system (Safari's Inspector report's a 404 for `file///favicon.ico`). Sadly in macOS we users don't have control over this part of our computer. Apple has provided a way to create things in `/` indirectly, and this is how the workaround is implemented.

Despite not being able to create files at `/` we can make what are referred to as *synthetic firmlinks* to things located in parts of the file system we *can* control. Essentially a *synthetic firmlink* is another kind of *alias* or *symlink* that has some special properties. You make them by listing the target and a file path in a `sythetic.conf` file.

This is how to implement this workaround. This instruction uses Terminal. It looks long and involved but it really isn't. If you think you are a Terminal novice, you are gonna be fine.
 1. Make a favicon.ico file in a reasonable place that you can control. For me I put on in my user folder in a Development folder I frequently use (`/Users/myusername/Development/safari-favicon-workaround/favicon.ico`)
 2. Open a Terminal and type `sudo nano /etc/synthetic.conf` this will open a Text editor in the Terminal.
 3. Type the password you use to login to your Mac. This ensures you are permitted to do what we're doing here.
 4. Type `favicon.ico {TAB} Users/myusername/Development/safari-favicon-workaround/favicon.ico`; **the TAB is really important. Type it with the Tab key**. *Do not use spaces*. If you make this file with a GUI or IDE editor, make sure that when you save the file, it saves with the tab character and doesn't convert tabs to spaces. Nano saves the file with the tab character intact.
 5. Type `^O` (Control key and letter oh)
 6. Hit `Return` Key
 7. Type `^X` (Control key and letter ex)
 8. Update the file we made to ensure correct permissions are set on it with these two commands: `sudo chown root:wheel /etc/synthetic.conf` then `sudo chmod 0644 /etc/synthetic.conf`; you might need to enter your login password again for these
 9. Double-check that the permissions are correct by typing `ls -l /etc/synthetic.conf` you want to be sure the listing has `-rw-r--r--` and `root  wheel` in it.
 10. Restart your Mac
 11. Reload the offending webpage and you shouldn't see the error

**Third Method**

In my testing, viewing my webpage using a **local web server** ensured the favicon in my HTML was being used, and that Safari never went looking for the one it thinks should be at `/`. In this scenario, you'll always want to run the server and view your pages this way so you don't see the error.

There are several ways to do this on your Mac, including starting the built-in Apache web server. **I didn't test this**, but my understanding is that the files that will be served must exist in your home folder in Sites `~/Sites` (`/Users/youruser/Sites`). You will need to search for how to do this (maybe [here](https://superuser.com/questions/225346/how-do-i-setup-a-localhost-using-the-sites-folder-on-my-mac#566617) )?

Another way to run a server easily without a lot of hassle is to start a Python 3 server in the directory where you are working. There is a chance that Python 3 is not the default Python version on your Mac, but also a good chance that Python 3 is installed.

Again we'll use Terminal to do this.
 1. Navigate to the place your web page is. `cd path/to/my/project`
 2. Type `python3 -m http.server`
 3. Assuming Python 3 is available and it doesn't return an error, open your browser and navigate to `http://localhost:8000/name-of-file`
 4. You should not see the error in the Inspector.
You can run the web server as long as you want, and to quit it press `^C` (Control and C)
 
I hope this  information is useful for anybody looking around for a solution to this problem.