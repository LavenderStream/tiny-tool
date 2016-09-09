import java.io.File;

public class Rename
{
    public static void main(String[] args)
    {
        String newExtensionName = args[1];
        String currentPath = args[0];
        if (!currentPath.contains("C:\\Users\\tiny\\Desktop\\"))
        {
          System.out.printf("this commend must be run on a fold which in Desktop");
          return ;
        }

        getFile(currentPath, newExtensionName);
    }

    public static String getFile(String path, String newExtensionName)
    {
        File rootDir = new File(path);
        if (!rootDir.isDirectory())
        {

            String oldFileName = rootDir.getAbsolutePath();
            if (oldFileName.contains("."))
            {
                int lastPointIndex = rootDir.getName().lastIndexOf(".");

                String oldName = rootDir.getName().substring(0,
                        lastPointIndex);

                        File newFile = null;
                            if (newExtensionName.equals("nu"))
                            {
                                newFile = new File(rootDir.getParentFile() + File.separator + oldName);
                            }
                            else
                            {
                                newFile = new File(rootDir.getParentFile() + File.separator + oldName + "." +
                                        newExtensionName);
                            }


                            rootDir.renameTo(newFile);

            }
            else
            {
                File newFile = new File(rootDir.getAbsoluteFile() + "." + newExtensionName);
                rootDir.renameTo(newFile);
            }
        }
        else
        {
            String[] fileList = rootDir.list();
            for (int i = 0; i < fileList.length; i++)
            {
                path = rootDir.getAbsolutePath() + "\\" + fileList[i];
                getFile(path, newExtensionName);
            }
        }
        return null;
    }
}
