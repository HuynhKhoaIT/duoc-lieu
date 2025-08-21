var Base = function () {
    return this.Init();
};
Base.prototype = {
    Init: function (options) {
        this.RegisterEvent();
    },
    RegisterEvent: function () {
        var that = this;
    },
    DownloadFile: function (idTheme, fileName, fileType, idFile) {
        $.ajax({
            type: 'POST',
            url: Base.Url.CheckFile,
            data: {
                IdTheme: idTheme,
                FileName: fileName
            },
            cache: false,
            success: function (result) {
                if (result.Status) {
                    var url = Base.Url.DownloadFile + '?idTheme=' + idTheme;
                    if (idFile != null) {
                        url = result.Obj;
                    }
                    window.open(url, "_self");
                } else {
                    Common.ShowAlert("Alert", result.Message);
                }
            },
            error: function (err) {
                Common.ShowAlert("Error", err);
            }
        });
    }
}