using System;
using System.Collections.Generic;

namespace EMedicine.Server.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? OrderNo { get; set; }

    public decimal? OrderTotal { get; set; }

    public string? OrderStatus { get; set; }
}
